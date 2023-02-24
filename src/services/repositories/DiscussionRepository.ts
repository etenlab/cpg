import {Repository} from "typeorm";
import {Discussion} from "../../models/Discussions";
import {DbService} from "../db.service";

export class DiscussionRepository {
    repository: Repository<Discussion>;

    constructor(private readonly dbService: DbService) {
        this.repository = this.dbService.dataSource.getRepository(Discussion);
    }

    create(discussion: Discussion) {
        return this.repository.save(discussion);
    }

    getAll() {
        return this.repository.find();
    }

}
