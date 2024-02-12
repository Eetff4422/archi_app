# Utiliser une image de base officielle Java (avec un tag spécifiant la version de JDK que vous utilisez)
FROM openjdk:17-oracle

# Copier le fichier jar compilé dans l'image
COPY fullstack-0.0.1-SNAPSHOT.jar ville-service.jar

# Exposer le port sur lequel votre application écoute
EXPOSE 8081

# Commande pour démarrer l'application
CMD ["java", "-jar", "ville-service.jar"]
