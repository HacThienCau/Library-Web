# ========== Bước 1: Build app ==========
FROM eclipse-temurin:17-jdk AS build

WORKDIR /app
COPY . .

# Build jar (bỏ test cho nhanh)
RUN ./mvnw clean package -DskipTests

# ========== Bước 2: Chạy app ==========
FROM eclipse-temurin:17-jdk AS runtime
WORKDIR /app

# Copy file jar từ bước build
COPY --from=build /app/target/*.jar app.jar

# Expose port (Render sẽ map port này)
EXPOSE 8081

ENTRYPOINT ["java","-jar","app.jar"]
