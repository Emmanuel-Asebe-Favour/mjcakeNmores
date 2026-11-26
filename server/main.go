package main

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"os"

	_ "modernc.org/sqlite"
)

type Product struct {
	ID                string   `json:"id"`
	Name              string   `json:"name"`
	Category          string   `json:"category"`
	Description       string   `json:"description"`
	Image             string   `json:"image"`
	Price             *float64 `json:"price"`
	IsAvailable       bool     `json:"isAvailable"`
	PackSize          string   `json:"packSize"`
	AvailableFlavours []string `json:"availableFlavours"`
	HasInscription    bool     `json:"hasInscription"`
	CreatedAt         string   `json:"createdAt"`
}

func main() {
	db, err := sql.Open("sqlite", "bakery.db")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	_, err = db.Exec(`CREATE TABLE IF NOT EXISTS products (
		id TEXT PRIMARY KEY,
		name TEXT NOT NULL,
		category TEXT NOT NULL,
		description TEXT,
		image TEXT,
		price REAL,
		is_available INTEGER NOT NULL DEFAULT 1,
		pack_size TEXT,
		flavours TEXT NOT NULL DEFAULT '[]',
		has_inscription INTEGER NOT NULL DEFAULT 0,
		created_at TEXT NOT NULL
	)`)
	if err != nil {
		log.Fatal(err)
	}

	// Run "go run . seed" once to load products from seed.json
	if len(os.Args) > 1 && os.Args[1] == "seed" {
		seedFromFile(db, "seed.json")
		return
	}

	http.HandleFunc("/api/products", func(w http.ResponseWriter, r *http.Request) {
		rows, err := db.Query(`SELECT id,name,category,description,image,price,
			is_available,pack_size,flavours,has_inscription,created_at FROM products`)
		if err != nil {
			http.Error(w, "database error", 500)
			return
		}
		defer rows.Close()

		products := []Product{}
		for rows.Next() {
			var p Product
			var price sql.NullFloat64
			var flavours string
			var avail, insc int
			if err := rows.Scan(&p.ID, &p.Name, &p.Category, &p.Description, &p.Image,
				&price, &avail, &p.PackSize, &flavours, &insc, &p.CreatedAt); err != nil {
				http.Error(w, "read error", 500)
				return
			}
			if price.Valid {
				p.Price = &price.Float64
			}
			p.IsAvailable = avail == 1
			p.HasInscription = insc == 1
			json.Unmarshal([]byte(flavours), &p.AvailableFlavours)
			products = append(products, p)
		}
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(products)
	})

	log.Println("listening on :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}

// seedFromFile copies products from a JSON file into the database.
// INSERT OR IGNORE means running it twice never creates duplicates.
func seedFromFile(db *sql.DB, path string) {
	data, err := os.ReadFile(path)
	if err != nil {
		log.Fatal(err)
	}
	var products []Product
	if err := json.Unmarshal(data, &products); err != nil {
		log.Fatal(err)
	}
	for _, p := range products {
		flavours := p.AvailableFlavours
		if flavours == nil {
			flavours = []string{}
		}
		fl, _ := json.Marshal(flavours)
		avail, insc := 0, 0
		if p.IsAvailable {
			avail = 1
		}
		if p.HasInscription {
			insc = 1
		}
		_, err := db.Exec(`INSERT OR IGNORE INTO products
			(id,name,category,description,image,price,is_available,pack_size,flavours,has_inscription,created_at)
			VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
			p.ID, p.Name, p.Category, p.Description, p.Image, p.Price,
			avail, p.PackSize, string(fl), insc, p.CreatedAt)
		if err != nil {
			log.Fatal(err)
		}
	}
	log.Printf("seeded %d products", len(products))
}
