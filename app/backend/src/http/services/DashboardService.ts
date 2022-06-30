import { GetMessage } from 'amqplib';
import Candidate from '../../database/models/Candidate';
import RabbitmqServer from '../rabbit';

const uri = 'amqp://username:password@rabbitmq:5672';

export default class DashboardService {
  static async createQueue(queue: string) {
    const server = new RabbitmqServer(uri);
    await server.start();
    await server.createQueue(queue);
    return `Fila ${queue} criada`;
  }

  static async publishInQueue(queue: string, message: string) {
    const server = new RabbitmqServer(uri);
    await server.start();
    await server.createQueue(queue);
    const response = await server.publishInQueue(queue, message);
    return response;
  }

  static async countMessages(queue: string) {
    const server = new RabbitmqServer(uri);
    await server.start();
    await server.createQueue(queue);
    const response = await server.consumeQueueCount(queue);
    return response;
  }

  static async countAllMessages() {
    const candidates = await Candidate.findAll();
    const server = new RabbitmqServer(uri);
    await server.start();

    const getQueue = async (q: number) => {
      const queue = await server.consumeQueueCount(q.toString()) as unknown as GetMessage;
      await server.publishInQueue(q.toString(), q.toString());
      return queue;
    }

    let votes: any = await Promise.all(candidates.map(async (candidate) => {
      const q = candidate.id;
      await server.createQueue(q.toString());
      const response = await getQueue(q);
      let count = 0;
      if (response.fields) count = response.fields.messageCount;
      const name = candidate.name;
      const id = q;
      const vote = { id, name, count };
      return vote;
    }));
    return votes;
  }

}
