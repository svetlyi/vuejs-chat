import UIkit from 'uikit';

function Notification() {}

Notification.prototype.send = function (message, status) {
  UIkit.notification({
    message: message,
    status: status,
    pos: 'bottom-right',
    timeout: 2000
  });
}

const notification = new Notification()

export default notification