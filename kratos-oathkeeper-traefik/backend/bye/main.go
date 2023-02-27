package main

import (
	"fmt"
	"net/http"
)

func main() {
	http.HandleFunc("/bye", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Bye!")
	})

	http.ListenAndServe(":8091", nil)
}
