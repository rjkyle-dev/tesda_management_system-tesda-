import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { NotificationsEntity } from "./notifications.entity";
import { NotificationsRecipientsEntity } from "src/entities";

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(NotificationsEntity)
    private readonly i_repository: Repository<NotificationsEntity>,

    @InjectRepository(NotificationsRecipientsEntity)
    private readonly recipientsRepository: Repository<NotificationsRecipientsEntity>,

    private readonly dataSource: DataSource
  ) {}

  async getAll() {
    return await this.i_repository
      .createQueryBuilder("n")
      .orderBy("n.datetime_added", "DESC")
      .getMany();
  }

  async getCount() {
    const total = await this.i_repository.count();
    return { total_cnt: total };
  }

  async findItem(id: number) {
    return await this.i_repository.findOne({ where: { id } });
  }

  async addItem(data: NotificationsEntity) {
    return await this.i_repository.save(data);
  }

  async editItem(data: any) {
    return await this.i_repository.update(data.id, data);
  }

  async deleteItem(data: any) {
    return await this.i_repository.delete(data.id);
  }

  async searchName(name: string) {
    return await this.i_repository
      .createQueryBuilder("n")
      .where("n.title LIKE :name OR n.message LIKE :name", {
        name: `%${name}%`,
      })
      .getMany();
  }

  async getAllByPage(page: number, limit: number) {
    const [data, count] = await this.i_repository.findAndCount({
      order: { datetime_added: "DESC" },
      skip: (page - 1) * limit,
      take: limit,
    });

    return [data, count];
  }

  // 🔥 Optimized — no memory merging
  async getUserNotifications(page: number, limit: number, userId: number) {
  const qb = this.i_repository
    .createQueryBuilder("n")
    .leftJoinAndMapOne(
      "n.nr",                     // map the recipient object to `n.nr`
      "notifications_recipients", // table to join
      "nr",
      "nr.notification_id = n.id AND nr.user_id = :userId",
      { userId }
    )
    .where("nr.user_id IS NOT NULL")
    .orWhere(
      `(n.reference_type = :refType AND n.type IN (:...types))`,
      {
        refType: "billing",
        types: ["billing_submission", "billing_status"],
      }
    )
    .orderBy("n.datetime_added", "DESC")
    .skip((page - 1) * limit)
    .take(limit);

  const [results, count] = await qb.getManyAndCount();

    // Manually join the is_read from recipients
    const mappedResults = results.map(n => {
    const recipient = (n as any).nr; // cast to any
    return {
        ...n,
        is_read: recipient?.is_read ?? 0,
    };
    });

  return [mappedResults, count];
}

  async markAsRead(userId: number, notificationId: number) {
    return await this.recipientsRepository.update(
      { user_id: userId, notification_id: notificationId },
      { is_read: 1 }
    );
  }

  // 🔥 Safe Transaction Version
  async createNotification(data: {
    title: string;
    message: string;
    type: string;
    referenceId?: number;
    referenceType?: string;
    createdBy: number;
    recipientIds: number[];
  }) {
    return await this.dataSource.transaction(async (manager) => {
      const notification = manager.create(NotificationsEntity, {
        title: data.title,
        message: data.message,
        type: data.type,
        reference_id: data.referenceId,
        reference_type: data.referenceType,
        created_by: data.createdBy,
      });

      const savedNotification = await manager.save(notification);

      const recipients = data.recipientIds.map((userId) =>
        manager.create(NotificationsRecipientsEntity, {
          notification_id: savedNotification.id,
          user_id: userId,
        })
      );

      await manager.save(recipients);

      return savedNotification;
    });
  }

  async getUnreadCount(userId: number) {
    const count = await this.recipientsRepository.count({
      where: {
        user_id: userId,
        is_read: 0,
      },
    });

    return { unread: count };
  }
}