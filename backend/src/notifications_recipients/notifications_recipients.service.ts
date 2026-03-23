import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { NotificationsRecipientsEntity } from "src/entities";

@Injectable()
export class NotificationsRecipientsService {
  constructor(
    @InjectRepository(NotificationsRecipientsEntity)
    private readonly i_repository: Repository<NotificationsRecipientsEntity>
  ) {}

  async getAll() {
    return await this.i_repository.find({
      order: { datetime_read: "DESC" },
    });
  }

  async getCount() {
    const total = await this.i_repository.count();
    return { total_cnt: total };
  }

  async findItem(id: number) {
    return await this.i_repository.findOne({ where: { id } });
  }

  async addItem(data: NotificationsRecipientsEntity) {
    return await this.i_repository.save(data);
  }

  async deleteItem(data: any) {
    return await this.i_repository.delete(data.id);
  }

  async getAllByPage(page: number, limit: number) {
    return await this.i_repository.findAndCount({
      order: { datetime_read: "DESC" },
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async markAsRead(data: { user_id: number; notification_id: number }) {
  // 1️⃣ Find the row first
  const recipient = await this.i_repository.findOne({
    where: {
      user_id: data.user_id,
      notification_id: data.notification_id,
    },
  });

  if (!recipient) {
    throw new Error('Recipient row not found'); // row must exist
  }

  // 2️⃣ Update fields
  recipient.is_read = 1;

  // 3️⃣ Save changes
  return await this.i_repository.save(recipient);
}
}