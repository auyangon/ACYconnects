interface Props { darkMode: boolean; }
export default function Component({ darkMode }: Props) {
  return <div style={{ color: darkMode ? '#fff' : '#000' }}>Component Placeholder</div>;
}
