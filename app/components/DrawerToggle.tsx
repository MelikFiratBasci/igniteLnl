import React, { useState } from 'react';
import { Button, View } from 'react-native';

export const DrawerToggle = ({ toggleDrawer }) => {
  return (
    <View>
      <Button title="Toggle Drawer" onPress={toggleDrawer} />
    </View>
  );
};


