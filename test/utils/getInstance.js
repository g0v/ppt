export default function getInstance(renderer) {
  return renderer._instance._instance;
}
// it's dirty and hacky but we need this until shallow testing gets more functionality
