import { Publisher, Subjects, TicketCreatedEvent } from "@chticketsorg/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    readonly subject = Subjects.TicketCreated;
}