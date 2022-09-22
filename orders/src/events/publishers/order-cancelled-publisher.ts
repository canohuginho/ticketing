import { OrderCancelledEvent, Publisher, Subjects } from "@chticketsorg/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    readonly subject = Subjects.OrderCancelled;
}