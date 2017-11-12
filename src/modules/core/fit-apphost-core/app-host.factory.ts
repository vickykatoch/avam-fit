import { AppHostProvider } from "./app-host.provider";

export abstract class AppHostProviderFactory {
  abstract getAppHostProvider(): AppHostProvider;
}
