export interface Authorities {
  aio: boolean;
  ncas: boolean;
  dps: boolean;
}

export interface ModalityConfig {
  enabled: boolean;
  parameter: string;
}

export interface Modalities {
  text: ModalityConfig;
  images: ModalityConfig;
  audio: ModalityConfig;
  video: ModalityConfig;
}
