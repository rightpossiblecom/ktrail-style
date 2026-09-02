'use client';

import { SessionProvider } from 'next-auth/react';
import { CartProvider } from '@/contexts/cart-context';
import { TimezoneProvider } from '@/contexts/timezone-context';
import { LocationProvider } from '@/contexts/location-context';
import { SettingsProvider } from '@/contexts/settings-context';
import { AuthSessionProvider } from '@/components/auth/AuthSessionProvider';
import { WorkspaceProvider } from '@/components/workspace/WorkspaceProvider';

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<AuthSessionProvider>
		<WorkspaceProvider>
			<SessionProvider>
				<SettingsProvider>
					<TimezoneProvider>
						<LocationProvider>
							<CartProvider>{children}</CartProvider>
						</LocationProvider>
					</TimezoneProvider>
				</SettingsProvider>
			</SessionProvider>
		</WorkspaceProvider>
		</AuthSessionProvider>
	);
}
