import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class FileValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!value) {
      throw new BadRequestException("Pas de fichier envoyé");
    }
    // Vérification du mimetype pour s'assurer que c'est une image
    if (!value.mimetype.startsWith('image')) {
      throw new BadRequestException('Le fichier doit être une image');
    }
    // Vérification de la taille du fichier (max 3 Mo)
    const maxFileSize = 3 * 1024 * 1024; 
    if (value.size > maxFileSize) {
      throw new BadRequestException("La taille de l'image ne doit pas dépasser 3Mo");
    }

    return value;
  }
}
