# web-components — root build orchestration
#
# Delegates all work to per-module Makefiles under src/.
# To work on a single component, cd into its directory and run make there.
#
# Usage:
#   make build         build all three components
#   make lint          lint all three components
#   make lint-fix      auto-fix lint errors in all three components
#   make clean         remove node_modules, dist, and public/ in all components
#   make clean-build   clean + build

MODULES := mermaid markdown chartjs voice

.PHONY: help build lint lint-fix clean clean-build \
        $(addprefix build-,$(MODULES)) \
        $(addprefix lint-,$(MODULES)) \
        $(addprefix clean-,$(MODULES))

help:
	@echo "web-components"
	@echo ""
	@echo "  make build         Build all components"
	@echo "  make lint          Lint all components"
	@echo "  make lint-fix      Auto-fix lint errors in all components"
	@echo "  make clean         Remove node_modules, dist, and public/ in all"
	@echo "  make clean-build   Clean and rebuild from scratch"
	@echo ""
	@echo "  make build-mermaid    Build mermaid only"
	@echo "  make build-markdown   Build markdown only"
	@echo "  make build-chartjs    Build chartjs only"
	@echo ""
	@echo "  To work on a single component:"
	@echo "    cd src/<name> && make <target>"

# ── All-modules targets (sequential so output stays readable) ──

build: $(addprefix build-,$(MODULES))

lint: $(addprefix lint-,$(MODULES))

lint-fix:
	@$(MAKE) --no-print-directory -C src/mermaid lint-fix
	@$(MAKE) --no-print-directory -C src/markdown lint-fix
	@$(MAKE) --no-print-directory -C src/chartjs lint-fix

clean: $(addprefix clean-,$(MODULES))

clean-build: clean build

# ── Per-module delegation ──

build-%:
	@$(MAKE) --no-print-directory -C src/$* build

lint-%:
	@$(MAKE) --no-print-directory -C src/$* lint

clean-%:
	@$(MAKE) --no-print-directory -C src/$* clean
