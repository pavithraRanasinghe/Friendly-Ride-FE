import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 120,
  },
  pickerContainer: {
    width: '80%',
    marginBottom: 40,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  picker: {
    height: 50,
    borderWidth: 1,
    borderColor: '#000',
  },
  micButton: {
    marginBottom: 40,
  },
  micCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#d7aefb', // light purple color
    justifyContent: 'center',
    alignItems: 'center',
  },
  micIcon: {
    width: 50,
    height: 50,
  },
  translateButton: {
    backgroundColor: '#ff6600', // orange color
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  translateButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
