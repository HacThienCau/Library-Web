package com.library_web.library.config;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.DriveScopes;
import com.google.auth.http.HttpCredentialsAdapter;
import com.google.auth.oauth2.ServiceAccountCredentials;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.HttpBackOffUnsuccessfulResponseHandler;
import com.google.api.client.http.HttpRequest;
import com.google.api.client.http.HttpRequestInitializer;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.client.util.ExponentialBackOff;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;

@Configuration
public class GoogleDriveConfig {

    @Value("${google.drive.application-name}")
    private String applicationName;

    @Value("${google.drive.service-account-key-path}")
    private String serviceAccountKeyPath;

    private static final JsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();

    @Bean
    public Drive driveService() throws IOException, GeneralSecurityException {
        final NetHttpTransport httpTransport = GoogleNetHttpTransport.newTrustedTransport();

        ServiceAccountCredentials credentials = (ServiceAccountCredentials)
        ServiceAccountCredentials.fromStream(new ClassPathResource(serviceAccountKeyPath).getInputStream())
        .createScoped(Collections.singleton(DriveScopes.DRIVE));

        // Tạo HttpRequestInitializer có timeout
        HttpRequestInitializer httpRequestInitializer = new HttpCredentialsAdapter(credentials) {
            @Override
            public void initialize(HttpRequest request) throws IOException {
                super.initialize(request);
                request.setConnectTimeout(3 * 60000); // 3 phút
                request.setReadTimeout(3 * 60000);    // 3 phút
                request.setUnsuccessfulResponseHandler(
                    new HttpBackOffUnsuccessfulResponseHandler(new ExponentialBackOff()));
            }
        };

        return new Drive.Builder(httpTransport, JSON_FACTORY, httpRequestInitializer)
                .setApplicationName(applicationName)
                .build();
}
}
