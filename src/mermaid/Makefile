# mermaid — build and lint for the wippy-wc-extras.mermaid module
#
# Output goes to ./public/ (embedded as fs.directory in _index.yaml).
#
# Usage:
#   make build      install deps + build to ./public/
#   make lint       run ESLint on frontend/src
#   make lint-fix   auto-fix ESLint errors
#   make clean      remove node_modules, dist, and public/

.PHONY: build install lint lint-fix clean

install:
	cd frontend && npm install

build: install
	cd frontend && npm run build

lint: install
	cd frontend && npm run lint

lint-fix: install
	cd frontend && npm run lint:fix

clean:
	rm -rf frontend/node_modules frontend/dist public
