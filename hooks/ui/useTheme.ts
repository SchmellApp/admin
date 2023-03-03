import {
  ColorScheme,
  MantineTheme,
  useMantineColorScheme,
  useMantineTheme
} from "@mantine/core";

const useTheme = (): {
  isDark: boolean;
  toggleScheme: (scheme?: ColorScheme) => void;
  theme: MantineTheme;
} => {
  const colorScheme = useMantineColorScheme().colorScheme;

  const toggleScheme = (scheme?: ColorScheme): void => {
    useMantineColorScheme().toggleColorScheme(scheme);
  };

  return {
    isDark: colorScheme === "dark",
    toggleScheme,
    theme: useMantineTheme()
  };
};

export default useTheme;
