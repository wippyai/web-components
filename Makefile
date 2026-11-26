# web-components — root build orchestration
#
# Delegates all work to per-module Makefiles under src/.
# To work on a single component, cd into its directory and run make there.
#
# Usage:
#   make build         build all components
#   make lint          lint all components
#   make lint-fix      auto-fix lint errors in all components
#   make clean         remove node_modules, dist, and public/ in all components
#   make clean-build   clean + build

MODULES := mermaid markdown chartjs echarts voice

.PHONY: help build lint lint-fix clean clean-build \
        $(addprefix build-,$(MODULES)) \
        $(addprefix lint-,$(MODULES)) \
        $(addprefix lint-fix-,$(MODULES)) \
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
	@echo "  make build-echarts    Build echarts only"
	@echo ""
	@echo "  To work on a single component:"
	@echo "    cd src/<name> && make <target>"

# ── All-modules targets (sequential so output stays readable) ──

build: $(addprefix build-,$(MODULES))

lint: $(addprefix lint-,$(MODULES))

lint-fix: $(addprefix lint-fix-,$(MODULES))

clean: $(addprefix clean-,$(MODULES))

clean-build: clean build

# ── Per-module delegation ──

$(addprefix build-,$(MODULES)): build-%:
	@$(MAKE) --no-print-directory -C src/$* build

$(addprefix lint-,$(MODULES)): lint-%:
	@$(MAKE) --no-print-directory -C src/$* lint

$(addprefix lint-fix-,$(MODULES)): lint-fix-%:
	@$(MAKE) --no-print-directory -C src/$* lint-fix

$(addprefix clean-,$(MODULES)): clean-%:
	@$(MAKE) --no-print-directory -C src/$* clean
