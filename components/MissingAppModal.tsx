import { Modal, View, Text, Pressable, StyleSheet } from "react-native";
import { t } from "../lib/i18n";

export default function MissingAppModal(props: {
  visible: boolean;
  label?: string;
  url?: string;
  onClose: () => void;
}) {
  const { visible, label, url, onClose } = props;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <Text style={styles.title}>{t("appNotInstalledTitle")}</Text>
          <Text style={styles.body}>
            {t("appNotInstalledBody")}
          </Text>

          {!!label && (
            <Text style={styles.detail} numberOfLines={2}>
              {label}
            </Text>
          )}

          {!!url && (
            <Text style={styles.detailDim} numberOfLines={2}>
              {url}
            </Text>
          )}

          <Pressable style={styles.button} onPress={onClose} hitSlop={10}>
            <Text style={styles.buttonText}>{t("ok")}</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  card: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "#0b0b0b",
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
  },
  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 8,
  },
  body: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  detail: {
    color: "white",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 4,
  },
  detailDim: {
    color: "rgba(255,255,255,0.55)",
    fontSize: 12,
    marginBottom: 14,
  },
  button: {
    alignSelf: "flex-end",
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "800",
  },
});
