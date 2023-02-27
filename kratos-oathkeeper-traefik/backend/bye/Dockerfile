FROM golang:alpine as builder
RUN mkdir /build
ADD . /build
WORKDIR /build
RUN GOOS=linux GOARCH=amd64 go build -o bye main.go

FROM scratch
EXPOSE 8091
COPY --from=builder /build/bye /bye
CMD ["./bye"]
