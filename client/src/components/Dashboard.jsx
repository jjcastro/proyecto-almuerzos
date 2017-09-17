import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import {DatePicker, RadioButtonGroup, RadioButton, RaisedButton} from "material-ui";

const styles = {
    block: {
        maxWidth: 250,
    },
    radioButton: {
        marginBottom: 30,
    },
};
const Dashboard = ({ secretData, onSumbit }) => (
    <div>
        <Card className="container">
            <form action="/" onSubmit={onSumbit}>
                <CardTitle
                    title="Vamos a encontrar un compañero de almuerzo"
                    subtitle="Por favor, selecciona la hora y el día para continuar."
                />
                <h3>Selecciona el día</h3>
                <DatePicker
                    hintText="¿Qué día?"
                    defaultDate = {new Date}
                    autoOk={true}
                />
                <h3>Selecciona la hora</h3>
                <RadioButtonGroup className="time" >
                    <RadioButton
                        value="time1"
                        label="11:00 - 12:30"
                        style={styles.radioButton}
                    />
                    <RadioButton
                        value="time2"
                        label="12:30 - 2:00"
                        style={styles.radioButton}
                    />
                    <RadioButton
                        value="time3"
                        label="2:00 - 3:30"
                        style={styles.radioButton}
                    />
                </RadioButtonGroup>
                <RaisedButton type="submit" label="Continuar" primary />
            </form>
        </Card>
    </div>
);

Dashboard.propTypes = {
    secretData: PropTypes.string.isRequired
};



export default Dashboard;
