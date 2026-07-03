package com.tharun.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

/**
 * File storage service — stores product images on local filesystem.
 */
@Service
public class FileStorageService {

    private final Path uploadPath;

    public FileStorageService(@Value("${app.upload.dir:uploads}") String uploadDir) {
        this.uploadPath = Paths.get(uploadDir).toAbsolutePath().normalize();
        try {
            Files.createDirectories(this.uploadPath);
        } catch (IOException e) {
            throw new RuntimeException("Could not create upload directory: " + uploadDir, e);
        }
    }

    /**
     * Store a file and return the URL path.
     */
    public String storeFile(MultipartFile file) {
        String originalFilename = file.getOriginalFilename();
        String extension = "";
        if (originalFilename != null && originalFilename.contains(".")) {
            extension = originalFilename.substring(originalFilename.lastIndexOf("."));
        }
        String filename = UUID.randomUUID().toString() + extension;

        try {
            Path targetLocation = this.uploadPath.resolve(filename);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
            return "/uploads/" + filename;
        } catch (IOException e) {
            throw new RuntimeException("Could not store file: " + filename, e);
        }
    }

    /**
     * Delete a file by its URL path.
     */
    public void deleteFile(String fileUrl) {
        if (fileUrl != null && fileUrl.startsWith("/uploads/")) {
            String filename = fileUrl.substring("/uploads/".length());
            try {
                Path filePath = this.uploadPath.resolve(filename);
                Files.deleteIfExists(filePath);
            } catch (IOException e) {
                // Log but don't throw — deletion failure shouldn't break operations
            }
        }
    }
}
