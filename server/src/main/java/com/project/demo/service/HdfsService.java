package com.project.demo.service;


import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

public interface HdfsService {
    String readFile(String filePath) throws IOException;
    void writeFile(String filePath, String content) throws IOException;
    void uploadFile(String hdfsPath, MultipartFile file) throws IOException;
    void deleteFile(String filePath) throws IOException;
    boolean exists(String filePath) throws IOException;
}