// app/(tabs)/profile.tsx
import { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Link, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import StatusBar from '../../components/common/StatusBar';
import Button from '../../components/common/Button';
import { Colors } from '../../constants/Colors';
import { logout } from '../../store/slices/authSlice';
import { RootState } from '../../store';

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const { user, isHost } = useSelector((state: RootState) => state.auth);
  
  const [notifications, setNotifications] = useState(true);

  const menuItems = [
    { icon: 'person', label: 'Your profile', href: '/profile/edit-profile' },
    { icon: 'card', label: 'Payment Methods', href: '/profile/payment-methods' },
    { icon: 'wallet', label: 'My Wallet', href: '/', badge: '$1,000' },
    { icon: 'home', label: 'My Listings', href: '/profile/my-listings', showBadge: isHost },
    { icon: 'calendar', label: 'My Bookings', href: '/', badge: '3' },
    { icon: 'star', label: 'My Reviews', href: '/' },
    { icon: 'settings', label: 'Settings', href: '/' },
    { icon: 'help-circle', label: 'Help Center', href: '/' },
    { icon: 'shield', label: 'Privacy Policy', href: '/' },
  ];

  const toggleNotifications = () => {
    setNotifications(!notifications);
  };

  const handleLogout = () => {
    dispatch(logout());
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      <StatusBar />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {user?.name?.split(' ').map(n => n[0]).join('') || 'MC'}
              </Text>
            </View>
            <TouchableOpacity style={styles.editAvatarButton}>
              <Ionicons name="camera" size={16} color={Colors.white} />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.userName}>{user?.name || 'Mbama Children #2555'}</Text>
          <Text style={styles.userEmail}>{user?.email || 'user@example.com'}</Text>
          
          <View style={styles.verificationBadge}>
            <Ionicons name="checkmark-circle" size={16} color={Colors.verified} />
            <Text style={styles.verificationText}>Verified Account</Text>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Bookings</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>4.8</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>$1,000</Text>
            <Text style={styles.statLabel}>Wallet</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="notifications" size={24} color={Colors.primary} />
            <Text style={styles.actionText}>Notifications</Text>
            <TouchableOpacity
              style={[styles.toggleSwitch, notifications && styles.toggleSwitchActive]}
              onPress={toggleNotifications}
            >
              <View style={[styles.toggleCircle, notifications && styles.toggleCircleActive]} />
            </TouchableOpacity>
          </TouchableOpacity>
          
          <Link href="/host/become-host" asChild>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="business" size={24} color={Colors.primary} />
              <Text style={styles.actionText}>{isHost ? 'Host Dashboard' : 'Become a Host'}</Text>
              <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
            </TouchableOpacity>
          </Link>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            (item.showBadge !== false) && (
              <Link key={index} href={item.href as any} asChild>
                <TouchableOpacity style={styles.menuItem}>
                  <View style={styles.menuLeft}>
                    <Ionicons name={item.icon as any} size={24} color={Colors.textSecondary} />
                    <Text style={styles.menuText}>{item.label}</Text>
                  </View>
                  
                  <View style={styles.menuRight}>
                    {item.badge && (
                      <View style={styles.badge}>
                        <Text style={styles.badgeText}>{item.badge}</Text>
                      </View>
                    )}
                    <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
                  </View>
                </TouchableOpacity>
              </Link>
            )
          ))}
        </View>

        {/* Switch Account */}
        <TouchableOpacity style={styles.switchAccount}>
          <Ionicons name="swap-horizontal" size={24} color={Colors.textSecondary} />
          <Text style={styles.switchAccountText}>Switch To User</Text>
        </TouchableOpacity>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out" size={24} color={Colors.danger} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appVersion}>Version 1.0.0</Text>
          <Text style={styles.appCopyright}>© 2024 RentalApp. All rights reserved.</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: Colors.white,
    fontSize: 36,
    fontWeight: 'bold',
  },
  editAvatarButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: Colors.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.background,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  verificationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  verificationText: {
    fontSize: 14,
    color: Colors.text,
    marginLeft: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
  },
  statLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    backgroundColor: Colors.border,
  },
  actionsContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  actionText: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
    marginLeft: 16,
  },
  toggleSwitch: {
    width: 50,
    height: 28,
    backgroundColor: Colors.gray3,
    borderRadius: 14,
    padding: 2,
  },
  toggleSwitchActive: {
    backgroundColor: Colors.primary,
  },
  toggleCircle: {
    width: 24,
    height: 24,
    backgroundColor: Colors.white,
    borderRadius: 12,
  },
  toggleCircleActive: {
    transform: [{ translateX: 22 }],
  },
  menuContainer: {
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuText: {
    fontSize: 16,
    color: Colors.text,
    marginLeft: 16,
  },
  menuRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  badgeText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  switchAccount: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    marginTop: 20,
  },
  switchAccountText: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
    marginLeft: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  logoutText: {
    flex: 1,
    fontSize: 16,
    color: Colors.danger,
    marginLeft: 16,
    fontWeight: '600',
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  appVersion: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  appCopyright: {
    fontSize: 12,
    color: Colors.textSecondary,
    opacity: 0.8,
  },
});