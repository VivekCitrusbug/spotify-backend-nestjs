import { PartialType } from "@nestjs/mapped-types";
import { CreateSongDto } from "./create-song.dto";

export class updateSongDto extends PartialType(CreateSongDto){

}