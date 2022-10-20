package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/davecgh/go-spew/spew"
)

func handle(w http.ResponseWriter, r *http.Request) {
	spew.Dump(r.Header)
	fmt.Fprintf(w, "bye")
}

func main() {
	http.HandleFunc("/bye", handle)
	log.Fatal(http.ListenAndServe(":8091", nil))
}
