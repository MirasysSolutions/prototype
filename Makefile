.PHONY: log-strapi log-web

shell:
	docker run -it --rm -p 4211:4211 -v $(shell pwd):/app -w /app node:20-alpine sh
	
log-account:
	docker compose logs account -f

log-transaction:
	docker compose logs transaction -f

restart-account:
	docker compose restart account

restart-transaction:
	docker compose restart transaction

down:
	docker compose down

up:
	docker compose up -d

restart:
	docker compose down && docker compose up -d

clean:
	rm -rf node_modules
	rm -rf packages/common/lib
	rm -rf services/account/dist
	rm -rf services/transaction/dist