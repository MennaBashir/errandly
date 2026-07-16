import { AsYouType, CountryCode, getCountries, getCountryCallingCode } from 'libphonenumber-js';
import { ChevronDown, Search, X } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { FlatList, Modal, Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Input from '@/components/shared/input';

type PhoneInputProps = {
  label?: string;
  value: string;
  onChange: (e164: string) => void;
  error?: string;
  defaultCountry?: CountryCode;
};

const flagEmoji = (country: CountryCode) =>
  String.fromCodePoint(...[...country].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65));

const countryName = (country: CountryCode) => {
  try {
    return new Intl.DisplayNames(['en'], { type: 'region' }).of(country) ?? country;
  } catch {
    return country;
  }
};

type CountryItem = {
  code: CountryCode;
  name: string;
  callingCode: string;
  flag: string;
};

const allCountries: CountryItem[] = getCountries()
  .map((code) => ({
    code,
    name: countryName(code),
    callingCode: getCountryCallingCode(code),
    flag: flagEmoji(code),
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

const PhoneInput = ({
  label = 'Phone number',
  value,
  onChange,
  error,
  defaultCountry = 'EG',
}: PhoneInputProps) => {
  const [country, setCountry] = useState<CountryCode>(defaultCountry);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [query, setQuery] = useState('');

  const callingCode = getCountryCallingCode(country);

  const national = useMemo(() => {
    const prefix = `+${callingCode}`;
    const digits = value.startsWith(prefix) ? value.slice(prefix.length) : value;
    return new AsYouType(country).input(digits);
  }, [value, country, callingCode]);

  const handleChangeText = (text: string) => {
    const digits = text.replace(/\D/g, '');
    onChange(digits ? `+${callingCode}${digits}` : '');
  };

  const handleSelectCountry = (item: CountryItem) => {
    setCountry(item.code);
    setPickerOpen(false);
    setQuery('');
    const digits = value.replace(/\D/g, '').replace(new RegExp(`^${callingCode}`), '');
    onChange(digits ? `+${item.callingCode}${digits}` : '');
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allCountries;
    return allCountries.filter(
      (c) => c.name.toLowerCase().includes(q) || c.callingCode.includes(q.replace('+', ''))
    );
  }, [query]);

  return (
    <>
      <Input
        label={label}
        value={national}
        onChangeText={handleChangeText}
        error={error}
        placeholder="000 000 0000"
        keyboardType="phone-pad"
        autoComplete="tel"
        prefix={
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Select country"
            onPress={() => setPickerOpen(true)}
            className="flex-row  items-center gap-1.5 active:opacity-70">
            <Text className="text-lg">{flagEmoji(country)}</Text>
            <Text className="font-inter text-base text-ink">+{callingCode}</Text>
            <ChevronDown size={14} color="#5E5E5E" />
          </Pressable>
        }
      />

      <Modal
        visible={pickerOpen}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setPickerOpen(false)}>
        <SafeAreaView edges={['top', 'bottom']} className="flex-1 bg-white">
          <View className="flex-row items-center justify-between px-5 py-4">
            <Text className="font-inter-bold text-xl text-ink">Select country</Text>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Close"
              onPress={() => setPickerOpen(false)}
              className="h-10 w-10 items-center justify-center rounded-full bg-canvas active:scale-95">
              <X size={20} color="#000000" />
            </Pressable>
          </View>

          <View className="mx-5 mb-2 flex-row items-center gap-3 rounded-full bg-canvas px-4">
            <Search size={18} color="#5E5E5E" />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search country or code"
              placeholderTextColor="#AFAFAF"
              autoCapitalize="none"
              className="h-12  flex-1 font-inter text-base text-ink"
            />
          </View>

          <FlatList
            data={filtered}
            keyExtractor={(item) => item.code}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item }) => (
              <Pressable
                accessibilityRole="button"
                onPress={() => handleSelectCountry(item)}
                className="flex-row items-center gap-3 border-b border-canvas px-5 py-4 active:bg-canvas">
                <Text className="text-xl">{item.flag}</Text>
                <Text className="flex-1 font-inter text-base text-ink" numberOfLines={1}>
                  {item.name}
                </Text>
                <Text className="font-inter text-base text-body">+{item.callingCode}</Text>
              </Pressable>
            )}
          />
        </SafeAreaView>
      </Modal>
    </>
  );
};

export default PhoneInput;
