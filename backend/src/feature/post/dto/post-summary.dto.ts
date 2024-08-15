import { ContentDTO } from "./content.dto";

export type PostSummaryDTO = {
    id: string,
    createdAt: Date,
    thumbnail: ContentDTO,
}