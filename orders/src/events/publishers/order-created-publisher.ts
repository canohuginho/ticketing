import { OrderCreatedEvent, Publisher, Subjects } from "@chticketsorg/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    readonly subject = Subjects.OrderCreated;
}