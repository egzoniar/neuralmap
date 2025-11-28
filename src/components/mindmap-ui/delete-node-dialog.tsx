import { BaseDialog } from "@/components/ui/base-dialog";
import { Trash2 } from "lucide-react";

interface DeleteNodeDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onConfirm: () => void;
	nodeName?: string;
}

export function DeleteNodeDialog({
	open,
	onOpenChange,
	onConfirm,
	nodeName,
}: DeleteNodeDialogProps) {
	return (
		<BaseDialog
			open={open}
			onOpenChange={onOpenChange}
			onConfirm={onConfirm}
			title="Delete Node?"
			confirmText="Delete Permanently"
			cancelText="Cancel"
			variant="destructive"
			icon={<Trash2 className="w-5 h-5" />}
		>
			<div className="space-y-4">
				<p className="text-base leading-relaxed">
					Are you sure you want to delete{" "}
					{nodeName && (
						<span className="font-semibold text-foreground">"{nodeName}"</span>
					)}
					?
				</p>

				<div className="space-y-3">
					<div>
						<p className="text-sm font-semibold text-foreground mb-1.5">
							This action cannot be undone
						</p>
						<p className="text-sm text-muted-foreground leading-relaxed">
							Once deleted, this node and all its associated data will be
							permanently removed from your mindmap.
						</p>
					</div>

					<div>
						<p className="text-sm font-medium text-foreground mb-1.5">
							What happens next:
						</p>
						<ul className="space-y-1.5 text-sm text-muted-foreground">
							<li className="flex items-start gap-2">
								<span className="mt-0.5">•</span>
								<span>All content and data will be permanently lost</span>
							</li>
							<li className="flex items-start gap-2">
								<span className="mt-0.5">•</span>
								<span>
									Child nodes will be automatically reconnected to the parent
									node
								</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</BaseDialog>
	);
}
