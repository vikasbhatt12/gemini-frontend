import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Smartphone } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { CountrySelector } from '../components/common/CountrySelector';
import countriesData from '../lib/countries.json';
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate
import toast from 'react-hot-toast'; // 2. Import toast

// Map the imported data to the format our components expect
const countries = countriesData.map(country => ({
  name: country.name,
  flag: country.flag,
  code: country.code,
  dialCode: country.dial_code,
}));

const OTPSchema = z.object({
  phone: z.string().min(10, "Phone number must be at least 10 digits").max(15, "Phone number is too long"),
});

const defaultCountry = countries.find(c => c.code === 'IN') || countries[0];

function AuthPage() {
  const navigate = useNavigate(); 
  const [formLoading, setFormLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(defaultCountry);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(OTPSchema),
  });
  
  const onSubmit = (data) => {
    if (!selectedCountry) {
      console.error("No country selected, cannot submit.");
      return;
    }

    setFormLoading(true);
    const fullPhoneNumber = `${selectedCountry.dialCode} ${data.phone}`;
    console.log("Form Data:", {
      dialCode: selectedCountry.dialCode,
      phone: data.phone,
    });
    
    setTimeout(() => {
      setFormLoading(false);
      toast.success('OTP sent successfully!');
      navigate('/auth/otp', { state: { fullPhoneNumber } });
      console.log("OTP Sent!");
    }, 2000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm space-y-6">
        <div className="text-center">
           <Smartphone className="mx-auto h-12 w-12 text-blue-500" />
           <h1 className="text-3xl font-bold mt-4">Welcome</h1>
           <p className="text-gray-500 dark:text-gray-400">
             Sign in or create an account to continue.
           </p>
        </div>
        <div className="rounded-lg border bg-white dark:bg-gray-800 shadow-sm p-6 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Phone Number</label>
            <div className="flex items-start gap-2">
              <CountrySelector 
                countries={countries}
                selectedCountry={selectedCountry}
                onSelect={setSelectedCountry}
              />
              <div className="flex-1">
                <Input
                  type="tel"
                  placeholder="98765 43210"
                  {...register("phone")}
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
              </div>
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={formLoading}>
            {formLoading ? 'Sending OTP...' : 'Send OTP'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AuthPage;