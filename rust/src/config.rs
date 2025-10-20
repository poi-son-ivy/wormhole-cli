use serde::{Deserialize, Serialize};
use solana_sdk::pubkey::PubKey;
use std::str::FromStr;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SolanaConfig {
    pub rpc_url: String,
    pub wormhole_program_id: String,
    pub token_bridge_program_id: String,
}

impl Default for SolanaConfig {
    fn default() -> Self {
        Self {
            rpc_url: "https://api.devnet.solana.com".to_string(),
            //Wormhole Core Bridge program ID on Solana devnet
            wormhole_program_id: "3u8hJUVTA4jH1wYAyUur7FFZVQ8H635K3tSHHF4ssjQ5".to_string(),
            //Token Bridge program ID on Solana devnet
            token_bridge_program_id: "DZnkkTmCiFWfYTfT41X3Rd1kDgozqzxWaHqsw6W4x2oe".to_string(),
        }
    }
}

impl SolanaConfig {
    pub fn wormhole_program_pubkey(&self) -> anyhow::Result<Pubkey> {
        Ok(Pubkey::from_str(&self.wormhole_program_id)?)
    }

    pub fn token_bridge_program_pubkey(&self) -> anyhow::Result<Pubkey> {
        Ok(Pubkey::from_str(&self.token_bridge_program_id)?)
    }
}