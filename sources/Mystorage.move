module my_addr::MyStorage {
    use std::signer;
    use aptos_framework::coin;
    use aptos_framework::aptos_coin::AptosCoin;

    struct TokenStorage has key {
        tokens: u64,
    }

    public entry fun store_tokens(account: &signer, amount: u64) acquires TokenStorage {
        let storage = borrow_global_mut<TokenStorage>(signer::address_of(account));
        storage.tokens = storage.tokens + amount;
    }

    public entry fun distribute_tokens(from: &signer, to: address, amount: u64) acquires TokenStorage {
        let storage = borrow_global_mut<TokenStorage>(signer::address_of(from));
        assert!(storage.tokens >= amount, 1);
        storage.tokens = storage.tokens - amount;
        // Transfer tokens to 'to' address using Aptos coin module
        coin::transfer<AptosCoin>(from, to, amount);
    }

    // Change from entry function to regular public function 
    public fun get_balance(account: address): u64 acquires TokenStorage {
        let storage = borrow_global<TokenStorage>(account);
        storage.tokens
    }

    public entry fun initialize(account: &signer) {
        move_to(account, TokenStorage { tokens: 0 });
    }
}
