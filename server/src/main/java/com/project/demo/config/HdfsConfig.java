package com.project.demo.config;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FileSystem;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;

import java.net.URI;

public class HdfsConfig {


    private String hdfsUri;


    private String hdfsUser;


    public Configuration hadoopConfiguration() {
        Configuration configuration = new Configuration();
        configuration.set("fs.defaultFS", hdfsUri);
        configuration.set("dfs.replication", "1");
        return configuration;
    }


    public FileSystem fileSystem() throws Exception {
        return FileSystem.get(new URI(hdfsUri), hadoopConfiguration(), hdfsUser);
    }
}