package com.quarzumagencia.kya.Controllers;

import com.quarzumagencia.kya.Models.FileModel;

import java.io.Serial;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.Base64;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.sql.rowset.serial.SerialBlob;

@RestController
@RequestMapping("/test")
public class TestController {

    @PostMapping("/uploadFile")
    public void uploadFile(@RequestBody FileModel fileModel) throws SQLException {
        System.out.print(fileModel.getFileInBase64());
        byte[] decodedByte = this.decodeBase64(fileModel.getFileInBase64().split(",")[1]);
        Blob blob = new SerialBlob(decodedByte);
        System.out.print(blob);

    }

    // Convert base64 string to byte array
    public byte[] decodeBase64(String base64) {
        return Base64.getDecoder().decode(base64.getBytes());
    }



}
