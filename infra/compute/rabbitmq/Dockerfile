FROM --platform=linux/amd64 rabbitmq:3-management-alpine

EXPOSE 5672 15672

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
  CMD rabbitmq-diagnostics -q ping
