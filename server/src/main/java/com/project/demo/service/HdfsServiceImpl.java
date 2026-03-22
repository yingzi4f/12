package com.project.demo.service;

import lombok.extern.slf4j.Slf4j;
import org.apache.hadoop.fs.FSDataInputStream;
import org.apache.hadoop.fs.FSDataOutputStream;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;


@Service
public class HdfsServiceImpl implements HdfsService {

    private FileSystem fileSystem;

    @Override
    public String readFile(String filePath) throws IOException {
        Path path = new Path(filePath);
        if (!fileSystem.exists(path)) {
            throw new IOException("文件不存在: " + filePath);
        }

        try (FSDataInputStream inputStream = fileSystem.open(path);
             BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream, StandardCharsets.UTF_8))) {

            StringBuilder content = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                content.append(line);
            }
            return content.toString();
        }
    }

    @Override
    public void writeFile(String filePath, String content) throws IOException {
        Path path = new Path(filePath);
        try (FSDataOutputStream outputStream = fileSystem.create(path)) {
            outputStream.write(content.getBytes(StandardCharsets.UTF_8));
        }
    }

    @Override
    public void uploadFile(String hdfsPath, MultipartFile file) throws IOException {
        Path path = new Path(hdfsPath);
        try (FSDataOutputStream outputStream = fileSystem.create(path)) {
            outputStream.write(file.getBytes());
        }
    }

    @Override
    public void deleteFile(String filePath) throws IOException {
        Path path = new Path(filePath);
        if (fileSystem.exists(path)) {
            fileSystem.delete(path, false);
        }
    }

    @Override
    public boolean exists(String filePath) throws IOException {
        return fileSystem.exists(new Path(filePath));
    }
}