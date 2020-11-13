type Src = string | (<T = string>() => Promise<T>);

type Optional<T> = T | null | undefined;

type User = {
  id: string;
  name?: string;
  avatarUrl?: Optional<string>;
  roles?: Array<string>;
  phoneNumber?: Optional<string>;
  displayName?: Optional<string>;
  email?: Optional<string>;
};

declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}
