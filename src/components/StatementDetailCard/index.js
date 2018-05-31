/* @flow */

import React from 'react';

import styles from '../../styles/main.scss';

type Props = { info: Object, role: String };

const StatementDetailCard = ({ info, role }: Props) => {
  switch (role) {
    case 'admin':
      return (
        <div className={styles.StatementDetail}>
          <h4>Statement Card</h4>
          <ul>
            <li>Name: {info.name}</li>
            <li>Phone: {info.phone}</li>
            <li>Email: {info.email}</li>
            <li>Website: {info.website}</li>
          </ul>
        </div>
      );
    default:
      return (
        <div className={styles.StatementDetail}>
          <h4>Statement Card</h4>
          <ul>
            <li>Name: {info.name}</li>
            <li>Phone: {info.phone}</li>
            <li>Email: {info.email}</li>
            <li>Website: {info.website}</li>
          </ul>
        </div>
      );
  }
};

export default StatementDetailCard;