use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct WormholeMessage {
    pub vaa_version: u8,
    pub consistency_level: u8,
    pub timestamp: u32,
    pub nonce: u32,
    pub emitter_chain: u16,
    pub emitter_address: String,
    pub sequence: u64,
    pub payload: Vec<u8>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct TransferDetails {
    pub message_id: String,
    pub source_chain: u16,
    pub target_chain: u16,
    pub sender_address: String,
    pub recipient_address: String,
    pub token_address: String,
    pub token_chain: u16,
    pub amount: String,
    pub timestamp: u32,
    pub status: TransferStatus,
}

#[derive(Debug, Clone, Copy, Serialize, Deserialize, PartialEq, Eq)]
pub enum TransferStatus {
    Initiated,
    InProgress,
    Completed,
    Failed,
}

impl std::fmt::Display for TransferStatus {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            TransferStatus::Initiated => write!(f, "Initiated"),
            TransferStatus::InProgress => write!(f, "In Progress"),
            TransferStatus::Completed => write!(f, "Completed"),
            TransferStatus::Failed => write!(f, "Failed"),
        }
    }

