export interface IUrlEditorGraphi {
  endpointUrl: string;
  onEndpointUrlChange: (url: string) => void;
  sdlUrl: string;
  onSdlUrlChange: (url: string) => void;
}
