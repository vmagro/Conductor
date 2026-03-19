
.PHONY: main

# Node 17+ uses OpenSSL 3 which breaks webpack 4's MD4 hash; use legacy provider
export NODE_OPTIONS=--openssl-legacy-provider

main:
	cd ui/main-window \
		&& npm run build:react
	RUST_LOG=info cargo run

all:
	cd ui/main-window \
		&& npm run build:react
	cd ui/stdout \
	    && npm run build
	RUST_LOG=info cargo run

setup:
	cd ui/main-window \
        && npm install
	cd ui/stdout \
        && npm install

frontend:
	cd ui/main-window \
		&& npm run build:react
	cd ui/stdout \
		&& npm run build

release:
	cd ui/main-window \
	    && npm run build:react
	cd ui/stdout \
	    && npm run build
	cargo build --release
