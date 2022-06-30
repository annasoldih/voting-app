import RabbitmqServer from '../rabbit';

export default class VoteService {
  static async add(id: number) {
    const server = new RabbitmqServer('amqp://username:password@rabbitmq:5672');
    await server.start();
    await server.createQueue(id.toString());
    await server.publishInQueue(id.toString(), JSON.stringify(id));
    await server.publishInExchange('amq.direct', 'rota', JSON.stringify(id));
    return id;
  }
}
