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
  const mantineScheme = useMantineColorScheme();

  const colorScheme = mantineScheme.colorScheme;
  const theme = useMantineTheme();

  const toggleScheme = (scheme?: ColorScheme): void => {
    mantineScheme.toggleColorScheme(scheme);
  };

  return {
    isDark: colorScheme === "dark",
    toggleScheme,
    theme
  };
};

export default useTheme;
