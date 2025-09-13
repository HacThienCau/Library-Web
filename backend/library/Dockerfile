# ========== Bước 1: Build app ==========
FROM maven:3.9.6-eclipse-temurin-17 AS build

WORKDIR /app
COPY . .

# Build jar (dùng Maven trong image, không cần ./mvnw)
RUN mvn clean package -DskipTests

# ========== Bước 2: Run app ==========
FROM eclipse-temurin:17-jdk AS runtime
WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java","-jar","app.jar"]
