package com.quarzumagencia.kya.Models;

import javax.validation.constraints.NotNull;
import java.io.Serializable;

public class FileModel implements Serializable {
    private String fileInBase64;

    public FileModel() {
    }

    public FileModel(String fileInBase64) {
        this.fileInBase64 = fileInBase64;
    }

    public String getFileInBase64() {
        return fileInBase64;
    }

    public void setFileInBase64(String fileInBase64) {
        this.fileInBase64 = fileInBase64;
    }
}
