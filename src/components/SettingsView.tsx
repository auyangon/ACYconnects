
interface Props {
  darkMode: boolean;
}

export default function PlaceholderView({ darkMode }: Props) {
  return (
    <div style={{ padding: '2rem', color: darkMode ? 'white' : 'black' }}>
      <h1>View coming soon...</h1>
    </div>
  );
}

